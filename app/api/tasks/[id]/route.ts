import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    // Validate status
    if (!status || !['pending', 'done'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status' },
        { status: 400 }
      );
    }

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));

    // In a real app, you would update the task in your database here
    console.log(`Updating task ${id} to status: ${status}`);

    return NextResponse.json({
      success: true,
      data: { id, status }
    });
  } catch (error) {
    console.error('Task update error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update task'
      },
      { status: 500 }
    );
  }
}