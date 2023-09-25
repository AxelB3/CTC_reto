<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    public function getTasks()
    {
        $tasks = Task::select('tasks.*', 'mex_states.name as name_state')
            ->join('mex_states', 'tasks.mexstate_id', '=', 'mex_states.id')
            ->orderBy('tasks.id', 'asc')
            ->get();

        return response()->json($tasks);
    }

    public function searchTasks(Request $request)
    {
        $filter = '%' . $request->filter . '%';

        $tasks = Task::select('tasks.*', 'mex_states.name as name_state')
            ->join('mex_states', 'tasks.mexstate_id', '=', 'mex_states.id')
            ->whereRaw("CONCAT(mex_states.name, ' ', tasks.title) ILIKE ?", [$filter])
            ->orderBy('tasks.id', 'asc')
            ->get();

        return response()->json($tasks);
    }

    public function createNew(Request $request)
    {
        $task = new Task();
        $task->title = $request->title;
        $task->description = $request->description;
        $task->date = $request->date;
        $task->mexstate_id = $request->mexstate_id;
        $task->name_creator = $request->name_creator;
        $task->number_likes = 0;
        $task->save();

        $allTasks = Task::select('tasks.*', 'mex_states.name as name_state')
            ->join('mex_states', 'tasks.mexstate_id', '=', 'mex_states.id')
            ->orderBy('tasks.id', 'asc')
            ->get();

        return response()->json($allTasks);
    }

    public function updateLikes(Request $request)
    {
        $id = $request->id;
        $task = Task::select('tasks.*', 'mex_states.name as name_state')
            ->join('mex_states', 'tasks.mexstate_id', '=', 'mex_states.id')
            ->where('tasks.id', $id)
            ->first();

        $task->number_likes = $request->number_likes;
        $task->save();

        return response()->json($task);
    }

    public function deleteTask($id)
    {
        $task = Task::find($id);

        $task->delete();

        $tasks = Task::select('tasks.*', 'mex_states.name as name_state')
            ->join('mex_states', 'tasks.mexstate_id', '=', 'mex_states.id')
            ->orderBy('tasks.id', 'asc')
            ->get();

        return response()->json($tasks);
    }
}
