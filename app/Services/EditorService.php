<?php

namespace App\Services;

use App\Models\Notes;
use DB;
use Tiptap;


class EditorService {
    protected $editor;

    public function transformNoteBodyHTML($notes) {
        foreach ($notes as $note) {
            $tempBody = $note['body'];
            $tempBody = $this->editor->setContent($tempBody)->getHTML();
            $tempBody = $this->editor->sanitize($tempBody);
            unset($note['body']);
            $note['body'] = $tempBody;
        }
    
        return $notes;
    }

    public function __construct() {
        $this->editor = new Tiptap\Editor([
                            'extensions' => [
                                new Tiptap\Nodes\Document,
                                new TipTap\Nodes\Paragraph,
                                new TipTap\Nodes\Text,
                                new Tiptap\Marks\Link,
                                new TipTap\Nodes\ListItem,
                                new TipTap\Nodes\OrderedList,
                                new TipTap\Nodes\BulletList,
                                new TipTap\Nodes\TaskList,
                                new TipTap\Nodes\TaskItem
                            ],]);
    }
}
