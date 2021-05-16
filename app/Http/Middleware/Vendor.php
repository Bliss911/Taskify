<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class Vendor
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (auth()->user()->role == 'VENDOR') {
            return $next($request);
        }
        return response()->json('Unauthorised action');
    }
}
