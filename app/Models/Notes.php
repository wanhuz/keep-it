<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notes extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'body',
    ];

    public function tags() {
        return $this->belongsToMany(Tag::class);
    }

    public function tagFilter($query, $searchQuery, $filters) {
        
        $query->when($filter == "tag" ?? false, fn($query, $search, $filter) =>  
            $query->where(fn($query) => 
                $query->whereHas('tags', fn($query) =>
                    $query->where('tags.name', '=', $filters['search']))
            )
        );
        
 
        $query->when($filterBy == "search" ?? false, fn($query, $filters) =>  
            $query->where(fn($query) =>
                $query
                    ->where("title", "like",  "%{$searchQuery}%")
                    ->orWhere("body", "like", "%{$searchQuery}%")
            )
        );
    }

    public function scopeFilter($query, array $filters) {
        $searchQuery = str($filters['searchQuery']);
        $filterBy = str($filters['filterBy']);

        $query->when($filters['searchQuery'] ?? false, function($query) use ($searchQuery, $filterBy) {

            if ($filterBy == "search") {
                $query->where(fn($query) =>
                    $query
                        ->where("title", "like",  "%{$searchQuery}%")
                        ->orWhere("body", "like", "%{$searchQuery}%")
                );
            }
            else if ($filterBy == "tag") {

                $query->where(fn($query) => 
                    $query->whereHas('tags', fn($query) =>
                        $query->where('tags.name', '=', $searchQuery))
                );

            }
        });

    }
}
