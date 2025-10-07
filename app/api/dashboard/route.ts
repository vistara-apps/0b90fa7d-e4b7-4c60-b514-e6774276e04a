import { NextResponse } from 'next/server';
import { DashboardData } from '@/lib/types';

// Mock data for development
const mockDashboardData: DashboardData = {
  todaySnapshot: {
    healthScore: 78,
    sleepHours: 7.2,
    steps: 8420,
    hrv: 45,
    budgetStatus: 'on-track',
    spendingToday: 42.50,
    streakCount: 5
  },
  recentSpending: [
    {
      id: '1',
      amount: 12.50,
      description: 'Coffee & Pastry',
      category: 'Food & Drink',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      stressContext: 'low'
    },
    {
      id: '2',
      amount: 30.00,
      description: 'Uber Ride',
      category: 'Transportation',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      stressContext: 'medium'
    }
  ],
  tasks: [
    {
      id: '1',
      title: 'Review quarterly budget',
      description: 'Analyze spending patterns and adjust budget categories',
      status: 'pending',
      aiPriorityScore: 85,
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      title: 'Schedule doctor appointment',
      description: 'Book annual checkup with primary care physician',
      status: 'pending',
      aiPriorityScore: 70,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      title: 'Complete project proposal',
      description: 'Finish the Q1 project proposal for client review',
      status: 'done',
      aiPriorityScore: 90,
      dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Yesterday
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    }
  ],
  insights: [
    {
      id: '1',
      type: 'health-money',
      pattern: 'Your sleep quality directly correlates with your spending decisions. On days when you get 7+ hours of sleep, you spend 23% less on impulse purchases.',
      confidence: 0.87,
      unlocked: true,
      unlockPrice: 500, // $5.00
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: '2',
      type: 'health-productivity',
      pattern: 'Your step count and task completion rate show a strong positive correlation. Days with 8,000+ steps result in 40% higher task completion.',
      confidence: 0.92,
      unlocked: false,
      unlockPrice: 750, // $7.50
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      type: 'money-productivity',
      pattern: 'Your most productive work hours (10 AM - 2 PM) coincide with your lowest spending periods. Consider scheduling important tasks during this window.',
      confidence: 0.78,
      unlocked: false,
      unlockPrice: 300, // $3.00
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    }
  ]
};

export async function GET() {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return NextResponse.json({
      success: true,
      data: mockDashboardData
    });
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch dashboard data'
      },
      { status: 500 }
    );
  }
}