import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
const ScheduleWidget = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadMomenceScript = () => {
      // Remove any existing script and styles
      const existingScript = document.querySelector('script[src*="momence.com/plugin"]');
      if (existingScript) {
        existingScript.remove();
      }
      const existingStyle = document.querySelector('#momence-styles');
      if (existingStyle) {
        existingStyle.remove();
      }

      // Add CSS styles for Momence
      const style = document.createElement('style');
      style.id = 'momence-styles';
      style.textContent = `
        :root {
          --momenceColorBackground: #FBFBFB;
          --momenceColorPrimary: 5, 97, 235;
          --momenceColorBlack: 3, 1, 13;
        }
      `;
      document.head.appendChild(style);

      // Create the script element with new configuration
      const script = document.createElement('script');
      script.src = 'https://momence.com/plugin/host-schedule/host-schedule.js';
      script.type = 'module';
      script.async = true;

      // Set all the required attributes for Momence configuration
      script.setAttribute('host_id', '33905');
      script.setAttribute('locale', 'en');
      script.setAttribute('location_ids', '[36372]');
      script.setAttribute('teacher_ids', '[]');
      script.setAttribute('show_additional_teachers', 'true');
      script.setAttribute('show_substituted_teachers', 'true');
      script.setAttribute('tag_ids', '[137949]');
      script.setAttribute('default_filter', 'show-all');
      script.setAttribute('hide_tags', 'true');

      // Add start date parameter for August 02, 2025
      script.setAttribute('start_date', '2025-08-02');
      script.onload = () => {
        console.log('Momence script loaded successfully');
        // Give the widget time to initialize
        setTimeout(() => setIsLoading(false), 2000);
      };
      script.onerror = () => {
        console.error('Failed to load Momence script');
        setIsLoading(false);
      };

      // Append to document body
      document.body.appendChild(script);
    };
    loadMomenceScript();
    return () => {
      // Cleanup on unmount
      const existingScript = document.querySelector('script[src*="momence.com/plugin"]');
      if (existingScript) {
        existingScript.remove();
      }
      const existingStyle = document.querySelector('#momence-styles');
      if (existingStyle) {
        existingStyle.remove();
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
  return;
};
export default ScheduleWidget;