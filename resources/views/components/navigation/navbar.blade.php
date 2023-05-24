<nav id="header" class="navbar navbar-expand-lg text-light sticky-top">
    <div class="container-fluid">
        <button id="menu-btn" class="btn ms-3 me-3 nav-btn" type="button"><i class="bi bi-list"></i></button>

        <a class="navbar-brand me-5 text-white">{{ $title }}</a>

        <div class="collapse navbar-collapse">
            <form id="searchbar" class="d-flex ms-5" role="search" action="/search">
                @csrf
                <input id="search-input" class="form-control" type="search" placeholder="Search" aria-label="Search">
            </form>
        </div>    

        <div class="me-4">
            <button type="button" class="btn nav-btn" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ $username }}</button>
            <ul class="dropdown-menu dropdown-menu-end end-0 mt-2 me-4">
                <li><button class="dropdown-item" type="button" id="userprefBtn"><i class="bi bi-gear me-3"></i>Settings</button></li>
                <li><button class="dropdown-item" type="button" id="logoutBtn"><i class="bi bi-box-arrow-right me-3"></i>Logout</button></li>
            </ul>
            <form id="logout-form" action="{{ route('logout') }}" method="POST"> @csrf </form>
        </div>

    </div>
</nav>