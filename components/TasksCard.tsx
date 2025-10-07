'use client';

import { CheckCircle2, Circle, ListTodo, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { CardSkeleton } from './SkeletonLoader';

interface Task {
  id: number;
  title: string;
  priority: number;
  done: boolean;
}

const mockTasks: Task[] = [
  { id: 1, title: 'Review Q4 financials', priority: 95, done: false },
  { id: 2, title: 'Morning workout', priority: 88, done: false },
  { id: 3, title: 'Client call at 2 PM', priority: 82, done: false },
];

export function TasksCard() {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setTasks(mockTasks);
      } catch (err) {
        setError('Failed to load tasks');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  if (loading) {
    return <CardSkeleton />;
  }

  if (error) {
    return (
      <div className="metric-card border-red-500 border-opacity-50">
        <div className="flex items-center gap-2 text-red-400">
          <ListTodo className="w-5 h-5" />
          <span className="text-sm">Error loading tasks</span>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 text-xs text-accent hover:text-yellow-400 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const pendingTasks = tasks.filter(task => !task.done);
  const completedTasks = tasks.filter(task => task.done);

  return (
    <div className="metric-card">
      <button 
        className="w-full text-left focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 rounded-lg"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        aria-label={`Tasks: ${pendingTasks.length} pending. ${expanded ? 'Collapse' : 'Expand'} details`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-blue-500 bg-opacity-20 flex items-center justify-center">
              <ListTodo className="w-5 h-5 text-blue-500" />
            </div>
            <h3 className="font-semibold">Tasks</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold text-blue-500">{pendingTasks.length}</div>
            {expanded ? (
              <ChevronUp className="w-4 h-4 text-muted" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted" />
            )}
          </div>
        </div>

        {!expanded && (
          <p className="text-sm text-muted">Click to expand details</p>
        )}
      </button>

      {expanded && (
        <div className="space-y-2 mt-4 pt-4 border-t border-slate-700">
          {tasks.map(task => (
            <button 
              key={task.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700 hover:bg-opacity-50 transition-all duration-200 cursor-pointer w-full text-left focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-30"
              onClick={(e) => {
                e.stopPropagation();
                toggleTask(task.id);
              }}
              aria-label={`${task.done ? 'Mark as incomplete' : 'Mark as complete'}: ${task.title}`}
            >
              {task.done ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-muted flex-shrink-0 hover:text-green-400 transition-colors" />
              )}
              <span className={`text-sm flex-1 transition-all duration-200 ${task.done ? 'line-through text-muted' : ''}`}>
                {task.title}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted">AI: {task.priority}</span>
                <div className={`w-2 h-2 rounded-full ${
                  task.priority >= 90 ? 'bg-red-500' : 
                  task.priority >= 80 ? 'bg-yellow-500' : 
                  'bg-green-500'
                }`} />
              </div>
            </button>
          ))}
          
          {completedTasks.length > 0 && (
            <div className="text-xs text-muted mt-4 pt-2 border-t border-slate-700">
              ✓ {completedTasks.length} completed today
            </div>
          )}
        </div>
      )}
    </div>
  );
}
