<?php

use App\Http\Controllers\MexStatesController;
use App\Http\Controllers\TasksController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/getMexStates', [MexStatesController::class, 'getMexStates']);
Route::get('/getTasks', [TasksController::class, 'getTasks']);
Route::post('/searchTasks', [TasksController::class, 'searchTasks']);
Route::post('/createNewTask', [TasksController::class, 'createNew']);
Route::put('/updateLikes', [TasksController::class, 'updateLikes']);
Route::delete('/deleteTask/{id}', [TasksController::class, 'deleteTask']);

