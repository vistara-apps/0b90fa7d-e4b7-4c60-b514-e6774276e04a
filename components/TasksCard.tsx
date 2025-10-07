'use client';

import { CheckCircle2, Circle, ListTodo, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { CardSkeleton } from './SkeletonLoader';
import { Task } from '@/lib/types';

interface TasksCardProps {
  tasks?: Task[];
  isLoading?: boolean;
}

export function TasksCard({ tasks = [], isLoading = false }: TasksCardProps) {
  const [expanded, setExpanded] = useState(false);

  if (isLoading) {
    return <CardSkeleton />;
  }

  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const completedTasks = tasks.filter(task => task.status === 'done');

  const toggleTask = (taskId: string) => {
    // This would typically update the task via API
    console.log('Toggle task:', taskId);
  };

  const getPriorityColor = (priority: number) => {
    if (priority >= 90) return 'bg-red-400';
    if (priority >= 80) return 'bg-amber-400';
    return 'bg-emerald-400';
  };

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
            <div className="w-10 h-10 rounded-full bg-indigo-500 bg-opacity-20 flex items-center justify-center ring-1 ring-indigo-500 ring-opacity-30">
              <ListTodo className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="font-semibold text-white">Tasks</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-3xl font-bold text-indigo-400">{pendingTasks.length}</div>
            {expanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </div>
        </div>

        {!expanded && (
          <p className="text-sm text-gray-400">Click to expand details</p>
        )}
      </button>

      {expanded && (
        <div className="space-y-2 mt-4 pt-4 border-t border-gray-600">
          {tasks.length === 0 ? (
            <div className="text-center py-4 text-gray-400">
              <ListTodo className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No tasks yet</p>
            </div>
          ) : (
            <>
              {tasks.map(task => (
                <button 
                  key={task.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 hover:bg-opacity-50 transition-all duration-200 cursor-pointer w-full text-left focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-30"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTask(task.id);
                  }}
                  aria-label={`${task.status === 'done' ? 'Mark as incomplete' : 'Mark as complete'}: ${task.title}`}
                >
                  {task.status === 'done' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400 flex-shrink-0 hover:text-emerald-400 transition-colors" />
                  )}
                  <span className={`text-sm flex-1 transition-all duration-200 ${
                    task.status === 'done' ? 'line-through text-gray-500' : 'text-white'
                  }`}>
                    {task.title}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">AI: {task.aiPriorityScore}</span>
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.aiPriorityScore)}`} />
                  </div>
                </button>
              ))}
              
              {completedTasks.length > 0 && (
                <div className="text-xs text-gray-400 mt-4 pt-2 border-t border-gray-600">
                  ✓ {completedTasks.length} completed today
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}