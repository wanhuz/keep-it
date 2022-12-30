<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;

class SettingController extends Controller
{
    public function store(Request $request) {
        $inputIsFile = false;
        $userSetting = $request->all();

        foreach ($userSetting as $key => $value) {
            if ($key == "_token") continue;

            switch($key) {
                case "favicon-img":
                    $fileName = 'favicon-img';
                    $fileInput = request()->file($fileName);
                    $inputIsFile = true;
                    break;
                case "bg-img":
                    $fileName = 'bg-img';
                    $fileInput = request()->file($fileName);
                    $inputIsFile = true;
                    break;
            }

            if ($inputIsFile) {
                Validator::validate($userSetting, [
                    'bg-img' => [
                        'required',
                        File::image()
                            ->min(5)
                            ->max(7 * 1024),
                    ],
                ]);
            }

            $value = $fileInput->store($fileName);

            Setting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }
        
        return $userSetting;
    }
}
