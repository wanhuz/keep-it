<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Session\SessionManager;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Setting;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;

class SettingService {
    private function getUser() {
        $userId = Auth::id();
        return User::find($userId);
    }

    private function hex_to_rgba($hex) {
        list($r, $g, $b) = sscanf($hex, "#%02x%02x%02x");
        return $r . "," . $g . "," . $b;
    }

    public function get() {
        return $this->getUser()->settings()->get();
    }

    public static function init($userId) {
        $userid = Auth::id();

        $defaultsettings = array(
            'app-name' => 'Keep-it',
            'card-size-style' => 'fixed',
            'card-size' => 'medium',
            'card-font-size' => 'medium',
            'bg-color' => '242,242,242',
            'head-color' => '2,136,209',
            'side-color' => '255,255,255',
            'favicon-img' => ''
        );

        $allsetting = [];
        foreach($defaultsettings as $defaultkey => $defaultval){
            $setting = new Setting();
            $setting->key = $defaultkey;
            $setting->value = $defaultval;
            $setting->user_id = $userid;
            $allsetting[] = $setting->attributesToArray();
        }

        Setting::insert($allsetting);
    }
    
    public function handleStore(Request $request) {
        $userSetting = $request->all();
        $maxFileSize = str_replace("M", "", ini_get('upload_max_filesize'));
        $user = $this->getUser();

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
            else if (str_contains($setting, "-tpc")) {
                $value = $value / 100;
            }
            else if (str_contains($setting, "-color")) {
                $value = $this->hex_to_rgba($value);
            }
            else if ($setting == "remove-favicon-img") {
                $favicon = Setting::firstWhere("key", "=", "favicon-img");
                $favicon->value = "";
                $favicon->save();
                continue;
            }
            else if ($setting == "remove-bg-img") {
                $bgimg = Setting::firstWhere("key", "=", "bg-img");
                $bgimg->value = "";
                $bgimg->save();
                continue;
            }

            $setting = $user->settings()->firstWhere('key', '=', $setting);
            $setting->value = $value;
            $setting->save();
        }
        
        return $userSetting;
    }

}