<?php

namespace App\Services;

use App\Models\Notes;
use DB;
use Tiptap;


class EditorService {
    protected $editor;

    public function parseNoteBodyHTML($notes) {
        foreach ($notes as $note) {
            $tempBody = $note['body'];
            $tempBody = $this->editor->setContent($tempBody)->getHTML();
            unset($note['body']);
            $note['body'] = $tempBody;
        }
    
        return $notes;
    }

    public function __construct() {
        $this->editor = new Tiptap\Editor([
                            'extensions' => [
                                new Tiptap\Extensions\StarterKit,
                                new Tiptap\Marks\Link,
                            ],
                        ]);
    }
}
