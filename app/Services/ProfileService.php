<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Session\SessionManager;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;

class ProfileService {
    private function getUser() {
        $userId = Auth::id();
        return User::find($userId);
    }
    
    public function handleStore(Request $request) {
        $user = $this->getUser();
        
        $request->whenFilled('name', function ($name) use ($user) {
            $this->storeName($user, $name);
        });

        if ($request->hasFile('avatarImg')) {
            $this->validateAvatar($request);
            $this->storeAvatar($user, $request->avatarImg);
        }
    }

    private function storeName($user, $name) {
        $user->name = $name;
        $user->save();
    }

    private function storeAvatar($user, $imgFile) {
        $avatarPath = $imgFile->store("uploads/avatar");

        $user->avatar = $avatarPath;
        $user->save();
    }

    private function validateAvatar(Request $request) {
        $maxFileSize = str_replace("M", "", ini_get('upload_max_filesize'));

        Validator::validate($request->all(), [
            'avatarImg' => [
                'required',
                File::image()->max($maxFileSize * 1024)
            ]
        ]);
    }

}