<aside id="sidebar" class="align-item-start sidebar">
    <div id="sidebarBtn" class="vh-100 ">
        <div>
            <form id="sidebar-btn-form" action="/load-note-by-tag" method="get">
                @csrf
                <button type="button" class="btn tag-btn ms-3 mt-1 text-start w-75" id="all-note-sidebar-btn"><i class="bi bi-stickies"></i><span class="ps-3">Notes</span></button>
                <hr class="ms-1 my-1">
                <div id="tagList" class="d-flex flex-column">
                    @foreach ($tags as $tag)
                        <x-tag.sidebar-btn>
                            <x-slot:value>{{$tag->name}}</x-slot>
                            {{$tag->name}}
                        </x-tag.sidebar-btn>
                    @endforeach
                </div>
                <hr class="ms-1 my-1">
            </form>
        </div>
        <button type="button" id="manageTagBtn" class="btn tag-btn ms-3 text-start w-75"><i class="bi bi-plus-circle"></i><span class="ps-3">Manage tag</span></button>
    </div>
</aside>