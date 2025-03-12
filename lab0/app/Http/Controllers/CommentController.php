<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $comments = Comment::orderBy('created_at', 'asc')->get();
        return view('comments',['comments'=>$comments]);
    }

    public function validate(Request $request, array $rules)
    {

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $comment = new Comment();
        return view('commentsForm',['comment'=>$comment]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Podstawowa walidacja formularza:
        $this->validate($request, [
            'message' => 'required|min:10|max:255',
        ]);

        if(\Auth::user() == null){
            return redirect('login');
        }

        $comment = new Comment();
        $comment->user_id = \Auth::user()->id;
        $comment->message = $request->message;

        if($comment->save()){
            return  redirect('comments');
        } else {
            return view('commentsForm');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
