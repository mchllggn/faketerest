<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Posts/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request): RedirectResponse
    {
        $data = $request->validated();

        $path = $request->file('image')->store('posts', 'public');

        Post::create([
            'user_id' => Auth::user()->id,
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'image_path' => $path,
        ]);

        return redirect()->route('home')->with('success', 'Post created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        abort_unless($post->user_id === Auth::id(), 403);

        return inertia('Posts/Show', [
            'post' => $post,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post): RedirectResponse
    {
        abort_unless($post->user_id === Auth::id(), 403);

        $data = $request->validated();

        if ($request->hasFile('image')) {
            if ($post->image_path) {
                Storage::disk('public')->delete($post->image_path);
            }

            $post->image_path = $request->file('image')->store('posts', 'public');
        }

        $post->title = $data['title'];
        $post->description = $data['description'] ?? null;
        $post->save();

        return redirect()->route('posts.show', $post)->with('success', 'Post updated.');
    }
}
