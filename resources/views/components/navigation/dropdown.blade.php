<ul class="dropdown-menu dropdown-menu-end end-0 me-4 pb-3 px-3">
    <li class="dropdown-header text-center pt-3 w-100 px-5 text-dark">
        <x-user.avatar>
            <x-slot:size>100</x-slot>
        </x-user.avatar>
        <p class="fs-5 mb-0">{{ !empty(user('name')) ? user('name') : user('username') }}</p>
        <small>
            @if(!empty(user('name'))) 
                {{ user('username') }} 
            @endif
        </small>
    </li>
    <li><hr class="dropdown-divider mx-auto"></li>
    <li><a href="/settings/user" class="dropdown-item mx-auto" type="button"><i class="bi bi-gear me-3 align-middle"></i>Settings</a></li>
    <li><button id="logoutBtn" type="submit"  class="dropdown-item"><i class="bi bi-box-arrow-right me-3 align-middle"></i>Logout</button></li>
</ul>