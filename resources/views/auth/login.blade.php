<x-auth>
                <p class="h4 fw-bold mb-4 mx-1 mx-md-4 mt-4">Log in</p>
                
                <form method="POST" action="/login" class="mx-1 mx-md-4">
                    @csrf

                    <div class="d-flex flex-row align-items-center mb-2">
                        
                        <i class="fas fa-envelope fa-lg fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                            <label class="form-label" for="form3Example3c">Email</label>
                            <input name="email" type="email" class="form-control" />
                        </div>
                    </div>

                    <div class="d-flex flex-row align-items-center mb-4">
                        <i class="fas fa-lock fa-lg fa-fw"></i>
                        <div class="form-outline flex-fill mb-0">
                            <label class="form-label" for="form3Example4c">Password</label>
                            <input name="password" type="password" class="form-control" />
                        </div>
                    </div>

                    <div class="d-flex flex-column mb-3">
                        <p class="mb-1">Need an account? <a class="text-decoration-none" href="/register">Sign up</a></p>
                        <p>Remember me? <input type="checkbox" name="remember"></p>  
                    </div>

                    <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4 ">
                        <button type="submit" class="btn btn-primary btn-lg px-5">Login</button>
                    </div>


                </form>

</x-auth>