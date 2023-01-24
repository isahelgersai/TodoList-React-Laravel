<?php

use App\Http\Controllers\Api\ToDoListController;
use App\Models\ToDoList;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Rutas del controlador para los respectivos endpoints
Route::controller(ToDoListController::class)->group(function () {
    Route::get('/todolist', 'list');
    Route::post('/todoitem', 'create');
    Route::get('/todoitem/{id}', 'show');
    Route::put('/todoitem/{id}', 'edit');
    Route::delete('/todoitem/{id}', 'delete');
});
