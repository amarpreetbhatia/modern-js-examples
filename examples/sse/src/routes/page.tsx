import './index.css';
import { useEffect, useRef, useState } from 'react';

const eventSource = new EventSource('/sse');

// Listen for the 'time-update' event (if specified on the server)
eventSource.addEventListener('time-update', event => {
  console.log('Received time update:', event.data);
  console.log('Event ID:', event.lastEventId);
});

// Listen for generic 'message' events (if no specific event type is set)
eventSource.onmessage = event => {
  console.log('Received message:', event.data);
};

// Handle errors
eventSource.onerror = error => {
  console.error('EventSource failed:', error);
  eventSource.close(); // Close the connection on error
};

const Index = () => {
  return <div>Hello World</div>;
};

export default Index;
