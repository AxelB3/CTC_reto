<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\MexStates;
use App\Models\Task;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $states = array(
            "Seleccionar estado",
            "Aguascalientes",
            "Baja California",
            "Baja California Sur",
            "Campeche",
            "Chiapas",
            "Chihuahua",
            "Coahuila",
            "Colima",
            "Durango",
            "Guanajuato",
            "Guerrero",
            "Hidalgo",
            "Jalisco",
            "México",
            "Michoacán",
            "Morelos",
            "Nayarit",
            "Nuevo León",
            "Oaxaca",
            "Puebla",
            "Querétaro",
            "Quintana Roo",
            "San Luis Potosí",
            "Sinaloa",
            "Sonora",
            "Tabasco",
            "Tamaulipas",
            "Tlaxcala",
            "Veracruz",
            "Yucatán",
            "Zacatecas"
        );

        foreach($states as $state){
            $mexState = new MexStates();
            $mexState -> name = $state;
            $mexState -> save();
        };

        $task = new Task();
        $task->title = 'Limpiar Calles';
        $task->description = 'Enviar un grupo de personas para limpiar las calles del centro';
        $task->date = date("2019-02-03");
        $task->mexstate_id = 3;
        $task->name_creator = "Luis";
        $task->number_likes = 30;
        $task->save();

        $task = new Task();
        $task->title = 'Pintar Calles';
        $task->description = 'Enviar un grupo de personas para pintar las calles del centro';
        $task->date = date("2019-07-31");
        $task->mexstate_id = 12;
        $task->name_creator = "Ricardo";
        $task->number_likes = 19;
        $task->save();

        $task = new Task();
        $task->title = 'Carrera Proeduca';
        $task->description = 'Carrera para recaudar fondos para jovenes de escasos recursos';
        $task->date = date("2023-11-15");
        $task->mexstate_id = 24;
        $task->name_creator = "Alondra";
        $task->number_likes = 245;
        $task->save();

        $task = new Task();
        $task->title = 'Comedor Comunitario';
        $task->description = 'Desayuno comunitario en ';
        $task->date = date("2021-10-05");
        $task->mexstate_id = 18;
        $task->name_creator = "Francisco";
        $task->number_likes = 0;
        $task->save();
    }
}
