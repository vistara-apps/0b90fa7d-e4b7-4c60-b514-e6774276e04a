'use client';

import { CheckCircle2, Circle, ListTodo } from 'lucide-react';
import { useState } from 'react';

const mockTasks = [
  { id: 1, title: 'Review Q4 financials', priority: 95, done: false },
  { id: 2, title: 'Morning workout', priority: 88, done: false },
  { id: 3, title: 'Client call at 2 PM', priority: 82, done: false },
];

export function TasksCard() {
  const [expanded, setExpanded] = useState(false);
  const [tasks, setTasks] = useState(mockTasks);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  return (
    <div 
      className="metric-card"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center">
            <ListTodo className="w-5 h-5 text-blue-500" />
          </div>
          <h3 className="font-semibold">Tasks</h3>
        </div>
        <div className="text-3xl font-bold text-blue-500">3</div>
      </div>

      {expanded ? (
        <div className="space-y-2 mt-4 pt-4 border-t border-slate-700">
          {tasks.map(task => (
            <div 
              key={task.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700 hover:bg-opacity-50 transition-all duration-200 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                toggleTask(task.id);
              }}
            >
              {task.done ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-muted flex-shrink-0" />
              )}
              <span className={`text-sm flex-1 ${task.done ? 'line-through text-muted' : ''}`}>
                {task.title}
              </span>
              <span className="text-xs text-muted">{task.priority}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted">Tap to expand</p>
      )}
    </div>
  );
}
