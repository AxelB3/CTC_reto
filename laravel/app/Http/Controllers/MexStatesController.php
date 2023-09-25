<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MexStates;

class MexStatesController extends Controller
{
     public function getMexStates()
     {
          $mexStates = MexStates::all();

          return response()->json($mexStates);
     }
}
