<ul class="dropdown-menu dropdown-menu-end end-0 mt-2 me-4">
    <div>
        <img src="{{ !empty(user('avatar')) ?  asset('storage/' . user('avatar')) : asset('avatar-default.png')  }}" alt="" class="img-thumbnail border-0 rounded-circle" width="150" height="150">
    </div>
    <li><a href="/settings/user"  class="dropdown-item" type="button"><i class="bi bi-gear me-3"></i>Settings</a></li>
    <li><button class="dropdown-item" type="button" id="logoutBtn"><i class="bi bi-box-arrow-right me-3"></i>Logout</button></li>
</ul>