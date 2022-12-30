<div class="modal zoom" id="userPreferenceModal" tabindex="-1" aria-labelledby="userPreferenceModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header pb-0 ms-3">
                <p>User preference</p>
            </div>

            <div class="modal-body">
                <div class="d-flex align-items-start" >

                <div class="nav flex-column gap-2 nav-pills me-3  text-start" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                    <button class="nav-link active text-start" id="v-pills-general-tab" data-bs-toggle="pill" data-bs-target="#v-pills-general" type="button" role="tab" aria-controls="v-pills-general" aria-selected="true">General</button>
                    <button class="nav-link text-start" id="v-pills-card-tab" data-bs-toggle="pill" data-bs-target="#v-pills-card" type="button" role="tab" aria-controls="v-card-profile" aria-selected="false">Card</button>
                    <button class="nav-link text-start" id="v-pills-color-tab" data-bs-toggle="pill" data-bs-target="#v-pills-color" type="button" role="tab" aria-controls="v-pills-color" aria-selected="false">Color</button>
                    <button class="nav-link text-start" id="v-pills-background-tab" data-bs-toggle="pill" data-bs-target="#v-pills-background" type="button" role="tab" aria-controls="v-pills-background" aria-selected="false">Background</button>
                    <button class="nav-link text-start" id="v-pills-transparency-tab" data-bs-toggle="pill" data-bs-target="#v-pills-transparency" type="button" role="tab" aria-controls="v-pills-transparency" aria-selected="false">Transparency</button>
                    <button class="nav-link text-start" id="v-pills-about-tab" data-bs-toggle="pill" data-bs-target="#v-pills-about" type="button" role="tab" aria-controls="v-pills-about" aria-selected="false">About</button>
                </div>

                <div class="vr"></div>

                <div class="tab-content mx-3 my-1" id="v-pills-tabContent">

                        <div class="tab-pane fade show active" id="v-pills-general" role="tabpanel" aria-labelledby="v-pills-general-tab" tabindex="0">
                            <div class="container">
                                <form id="generalForm">
                                    @csrf
                                    <div class="mb-3 ">
                                        <label for="applicationNameInput" class="form-label">Application name</label>
                                        <input type="text" class="form-control" id="applicationNameInput" aria-label="applicationName" aria-describedby="app-name" name="app-name">
                                    </div>

                                    <div class="mb-3 gap-2 align-items-center">
                                        <label for="faviconInput" class="form-label">Website icon</label>
                                        <input class="ms-auto form-control mb-2" type="file" id="faviconInput" name="favicon-img" accept=".gif,.jpg,.png,.ico,.svg">
                                        <sup>*Accepted file format: ico/png/gif/jpeg/svg</sup>
                                        <sup>*Recommended icon size: 16px x 16px</sup>
                                    </div>
                                </form>
                            </div>
                        </div>
                        
                        <div class="tab-pane fade" id="v-pills-card" role="tabpanel" aria-labelledby="v-pills-card-tab" tabindex="0">
                            <div class="container">
                                <form id="cardForm">
                                    @csrf
                                    <div class="mb-3">
                                        <label for="cardStyleInput" class="form-label">Card size style</label>
                                        <select class="form-select" aria-label="Default" id="cardStyleInput" name="card-size-style">
                                            <option selected>Default</option>
                                            <option value="dynamic">Dynamic</option>
                                            <option value="static">Static</option>
                                        </select>                                
                                    </div>

                                    <div class="mb-3">
                                        <label for="cardSizeInput" class="form-label">Card default size</label>
                                        <select class="form-select" aria-label="Default" id="cardSizeInput" name="card-size">
                                            <option selected>Default</option>
                                            <option value="small">Small</option>
                                            <option value="medium">Medium (default)</option>
                                            <option value="big">Big</option>
                                        </select>                                
                                    </div>

                                    <div class="mb-3">
                                        <label for="cardFontSizeInput" class="form-label">Card font size</label>
                                        <select class="form-select" aria-label="Default" id="cardFontSizeInput" name="card-font-size">
                                            <option selected>Default</option>
                                            <option value="small">Small</option>
                                            <option value="medium">Medium</option>
                                            <option value="big">Big</option>
                                        </select>                                
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="v-pills-color" role="tabpanel" aria-labelledby="v-pills-color-tab" tabindex="0">
                            <div class="container">
                                <form id="colorForm">
                                    @csrf
                                    <div class="mb-3 d-flex gap-2 align-items-center">
                                            <label for="exampleFormControlInput1" class="form-label">Header color</label>
                                            <div class="ms-auto"><x-form.color-picker></x-form.color-picker></div>
                                    </div>

                                    <div class="mb-3 d-flex gap-2 align-items-center">
                                            <label for="exampleFormControlInput1" class="form-label">Sidebar color</label>
                                            <div class="ms-auto"><x-form.color-picker></x-form.color-picker></div>
                                            
                                    </div>

                                    <div class="mb-3 d-flex gap-2 align-items-center">
                                            <label for="exampleFormControlInput1" class="form-label">Background color</label>
                                            <div class="ms-auto"><x-form.color-picker></x-form.color-picker></div>
                                    </div>
                                </form>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="v-pills-background" role="tabpanel" aria-labelledby="v-pills-background-tab" tabindex="0">
                            <form id="bgForm">
                                @csrf
                                <div class="container">
                                    <div class="mb-3 gap-2 align-items-center">
                                        <label for="backgroundImgInput" class="form-label">Background image</label>
                                        <input class="ms-auto form-control" type="file" id="backgroundImgInput" name="bg-img" accept="image/*">
                                    </div>

                                </div>
                            </form>
                        </div>

                        <div class="tab-pane fade" id="v-pills-transparency" role="tabpanel" aria-labelledby="v-pills-transparency-tab" tabindex="0">
                            <form id="transForm">
                                @csrf
                                <div class="container">
                                    <div class="mb-3 gap-2 align-items-center">
                                            <label for="headerTransparentInput" class="form-label">Header transparency</label>
                                            <input class="d-block w-100" type="range" name="headerTransparentInput" id="headerTransparentInput">
                                    </div>

                                    <div class="mb-3 gap-2 align-items-center">
                                            <label for="cardTransparentInput" class="form-label">Card transparency</label>
                                            <input class="d-block w-100" type="range" name="cardTransparentInput" id="cardTransparentInput">
                                    </div>

                                    <div class="mb-3 gap-2 align-items-center">
                                            <label for="sidebarTransparentInput" class="form-label">Sidebar transparency</label>
                                            <input class="d-block w-100" type="range" name="sidebarTransparentInput" id="sidebarTransparentInput">
                                    </div>

                                    <div class="mb-3 gap-2 align-items-center">
                                            <label for="cardEditorTransparentInput" class="form-label">Card editor background transparency</label>
                                            <input class="d-block w-100" type="range" name="cardEditorTransparentInput" id="cardEditorTransparentInput">
                                    </div>
                                </div>
                            </form> 
                        </div>

                        <div class="tab-pane fade" id="v-pills-about" role="tabpanel" aria-labelledby="v-pills-about-tab" tabindex="0">
                            <div class="container">
                                <a href="https://github.com/wanhuz/keep-it">Keep-it</a> project is open-sourced software licensed under the MIT license.
                                Inspired by Google Keep.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button class="btn btn-outline-primary border border-0 ms-auto" id="saveUserConfBtn">Save</button>
                <button class="btn btn-outline-primary border border-0" id="cancelUserConfBtn">Cancel</button> 
                <button class="btn btn-outline-primary border border-0" id="applyUserConfBtn">Apply</button> 
            </div>
        </div>
    </div>
</div>