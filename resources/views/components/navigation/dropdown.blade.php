<ul class="dropdown-menu dropdown-menu-end end-0 me-4 ">
    <li class="dropdown-header text-center pt-3 w-100 px-5">
        <x-user.avatar>
            <x-slot:size>100</x-slot>
        </x-user.avatar>
        <p class="fs-5 mb-0">{{ user('name') }}</p>
        <small>{{ user('username') }}</small>
    </li>
    <li><hr class="dropdown-divider"></li>
    <li><a href="/settings/user"  class="dropdown-item" type="button"><i class="ms-3 bi bi-gear me-3 align-middle"></i>Settings</a></li>
    <li><button class="dropdown-item" type="button" id="logoutBtn"><i class="ms-3 bi bi-box-arrow-right me-3 align-middle"></i>Logout</button></li>
</ul>