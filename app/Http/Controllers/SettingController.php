<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;

class SettingController extends Controller
{
    public function store(Request $request) {
        $userSetting = $request->all();
        $maxFileSize = str_replace("M", "", ini_get('upload_max_filesize'));

        foreach ($userSetting as $setting => $value) {
            if ($setting == "_token") continue;
            if (empty($value)) continue;

            if ($setting == "favicon-img") {
                $fileName = "favicon-img";
                
                $fileInput = request()->file($fileName);

                Validator::validate($userSetting, [
                    $fileName => [
                        'required',
                        'file' => 'max: ' . $maxFileSize * 1024,
                        'x-icon' => 'mimes:ico',
                    ]
                ]);

                $value = $fileInput->store($fileName); 
            }
            else if ($setting == "bg-img") {
                $fileName = "bg-img";
                $fileInput = request()->file($fileName);
                
                Validator::validate($userSetting, [
                    $fileName => [
                        'required',
                        File::image()->max($maxFileSize * 1024)
                    ]
                ]);

                $value = $fileInput->store($fileName);
            }

            Setting::updateOrCreate(
                ['key' => $setting],
                ['value' => $value]
            );
        }
        
        return $userSetting;
    }
}
