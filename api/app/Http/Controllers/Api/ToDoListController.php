<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ToDoList;

class ToDoListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function list()
    {
        $items = ToDoList::all();
        return $items;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function create(Request $request)
    {
        $item = new ToDoList();
        $item->nombre = $request->nombre;
        $item->descripcion = $request->descripcion;
        $item->estado = $request->estado;

        $item->save();
        return $item;
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $item = ToDoList::find($id);
        return $item;
    }

    /**
     * Update the specified resource in storage.
     */
    public function edit(Request $request, $id)
    {
        $item = ToDoList::findOrFail($request->id);
        $item->nombre = $request->nombre;
        $item->descripcion = $request->descripcion;
        $item->estado = $request->estado;

        $item->save();
        return $item;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function delete($id)
    {
        ToDoList::destroy($id);
        return $id;
    }
}
