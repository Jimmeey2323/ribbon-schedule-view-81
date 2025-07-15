import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
const ScheduleWidget = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadMomenceScript = () => {
      // Remove any existing script
      const existingScript = document.querySelector('script[src*="momence.com/plugin"]');
      if (existingScript) {
        existingScript.remove();
      }

      // Create the script element
      const script = document.createElement('script');
      script.src = 'https://momence.com/plugin/host-schedule/host-schedule.js';
      script.type = 'module';
      script.async = true;

      // Set all the required attributes for Momence configuration
      script.setAttribute('host_id', '33905');
      script.setAttribute('locale', 'en');
      script.setAttribute('location_ids', '[36372]');
      script.setAttribute('session_type', 'private');
      script.setAttribute('show_additional_teachers', 'true');
      script.setAttribute('show_substituted_teachers', 'true');
      script.setAttribute('tag_ids', '[137949]');
      script.setAttribute('teacher_ids', '[]');
      script.setAttribute('default_filter', 'show-all');
      script.setAttribute('hide_tags', 'true');
      script.onload = () => {
        console.log('Momence script loaded successfully');
        // Give the widget time to initialize
        setTimeout(() => setIsLoading(false), 2000);
      };
      script.onerror = () => {
        console.error('Failed to load Momence script');
        setIsLoading(false);
      };

      // Append to document body instead of a specific container
      document.body.appendChild(script);
    };
    loadMomenceScript();
    return () => {
      // Cleanup on unmount
      const existingScript = document.querySelector('script[src*="momence.com/plugin"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);
  if (isLoading) {
    return <Card className="momence-schedule-container">
        <div className="space-y-4 p-6">
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({
            length: 6
          }).map((_, i) => <Skeleton key={i} className="h-24 w-full" />)}
          </div>
          <Skeleton className="h-12 w-full" />
        </div>
      </Card>;
  }
  return <div id="momence-schedule-widget" className="momence-schedule-container animate-fade-in" />;
};
export default ScheduleWidget;
