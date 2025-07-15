
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const ScheduleWidget = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const loadMomenceScript = () => {
      console.log('Starting to load Momence script...');
      
      // Remove any existing script and styles
      const existingScript = document.querySelector('script[src*="momence.com/plugin"]');
      if (existingScript) {
        existingScript.remove();
        console.log('Removed existing script');
      }
      
      const existingStyle = document.querySelector('#momence-styles');
      if (existingStyle) {
        existingStyle.remove();
        console.log('Removed existing styles');
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
        
        #ribbon-schedule {
          min-height: 400px;
          width: 100%;
        }
      `;
      document.head.appendChild(style);
      console.log('Added Momence styles');

      // Ensure the target div exists before loading script
      const targetDiv = document.getElementById('ribbon-schedule');
      if (!targetDiv) {
        console.error('Target div #ribbon-schedule not found');
        return;
      }

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
      script.setAttribute('start_date', '2025-08-02');

      script.onload = () => {
        console.log('Momence script loaded successfully');
        setScriptLoaded(true);
        // Give more time for the widget to initialize and render
        setTimeout(() => {
          const scheduleElement = document.getElementById('ribbon-schedule');
          console.log('Schedule element after load:', scheduleElement);
          console.log('Schedule element innerHTML:', scheduleElement?.innerHTML);
          setIsLoading(false);
        }, 3000);
      };
      
      script.onerror = () => {
        console.error('Failed to load Momence script');
        setIsLoading(false);
      };

      // Append to document head instead of body
      document.head.appendChild(script);
      console.log('Script added to document head');
    };

    // Wait a moment for the DOM to be ready
    const timer = setTimeout(() => {
      loadMomenceScript();
    }, 100);

    return () => {
      clearTimeout(timer);
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
    return (
      <Card className="momence-schedule-container">
        <div className="space-y-4 p-6">
          <Skeleton className="h-8 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
          <Skeleton className="h-12 w-full" />
        </div>
      </Card>
    );
  }

  return (
    <div className="w-full">
      <div 
        id="ribbon-schedule" 
        className="momence-schedule-container animate-fade-in w-full min-h-[400px]" 
      />
      {scriptLoaded && (
        <div className="text-center text-gray-500 mt-4">
          <p>If the schedule doesn't appear, please refresh the page.</p>
        </div>
      )}
    </div>
  );
};

export default ScheduleWidget;
