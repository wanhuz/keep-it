<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;

class SettingController extends Controller
{
    public function store(Request $request) {
        $isFile = false;
        $fileInput;
        $userSetting = $request->all();

        foreach ($userSetting as $key => $value) {
            if ($key == "_token") continue;

            switch($key) {
                case "favicon-img":
                    $fileInput = request()->file('favicon-img');
                    $value = $fileInput->store('favicon');
                    $isFile = true;
                    break;
                case "bg-img":
                    $fileInput = request()->file('bg-img');
                    $value = $fileInput->store('bg-img');
                    $isFile = true;
                    break;
            }

            if ($isFile) {
                Validator::validate($userSetting, [
                    'bg-img' => [
                        'required',
                        File::image()
                            ->min(5)
                            ->max(7 * 1024),
                    ],
                ]);
            }

            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }
        
        return $userSetting;
    }
}
