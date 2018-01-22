<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use App\User;
use App\Mail\ContactUsMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class SupportController extends Controller
{
    public function email(Request $request)
    {
        $data = request()->validate([
            'name' => [
                'required',
                'regex:/(^[A-Za-z0-9 ]+$)+/'
            ],
            'email' => [
                'required',
                'email'
            ],
            'subject' => [
                'present',
                'required'
            ],
            'message' => [
                'present',
                'required'
            ],
        ]);
        $user = User::first();
        Mail::to($user)
        ->queue(new ContactUsMail($data));
        return response()->json(['message' => 'Mail Sent'],200);
    }
}
