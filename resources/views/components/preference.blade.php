<div class="modal zoom" id="userPreferenceModal" tabindex="-1" aria-labelledby="userPreferenceModalLabel" aria-hidden="true">
    <div class=" modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header pb-0 ms-3">
                <p>User preference</p>
            </div>

            <div class="modal-body">
                <div class="d-flex align-items-start " >
                    <div class="nav flex-column gap-2 nav-pills me-3  text-start" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <button class="nav-link active text-start" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab" aria-controls="v-pills-home" aria-selected="true">General</button>
                        <button class="nav-link text-start" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab" aria-controls="v-pills-profile" aria-selected="false">Card</button>
                        <button class="nav-link text-start" id="v-pills-font-tab" data-bs-toggle="pill" data-bs-target="#v-pills-font" type="button" role="tab" aria-controls="v-pills-font" aria-selected="false">Font</button>
                        <button class="nav-link text-start" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab" aria-controls="v-pills-messages" aria-selected="false">Color</button>
                        <button class="nav-link text-start" id="v-pills-background-tab" data-bs-toggle="pill" data-bs-target="#v-pills-background" type="button" role="tab" aria-controls="v-pills-background" aria-selected="false">Background</button>
                        <button class="nav-link text-start" id="v-pills-transparency-tab" data-bs-toggle="pill" data-bs-target="#v-pills-transparency" type="button" role="tab" aria-controls="v-pills-transparency" aria-selected="false">Transparency</button>
                        <button class="nav-link text-start" id="v-pills-about-tab" data-bs-toggle="pill" data-bs-target="#v-pills-about" type="button" role="tab" aria-controls="v-pills-about" aria-selected="false">About</button>
                    </div>
                    <div class="vr"></div>
                    <div class="tab-content mx-3 my-1" id="v-pills-tabContent">
                        <div class="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab" tabindex="0">
                            <div class="container">
                                <div class="mb-3 ">
                                    <label for="exampleFormControlInput1" class="form-label">Application name</label>
                                    <input type="text" class="form-control" id="exampleFormControlInput1" aria-label="Username" aria-describedby="basic-addon1">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Show full sidebar by default</label>
                                    <select class="form-select" aria-label="Default">
                                        <option selected>Default</option>
                                        <option value="1">Show sidebar icon and text</option>
                                        <option value="2">Show icon only</option>
                                    </select>                                
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab" tabindex="0">
                            <div class="container">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Card size style</label>
                                    <select class="form-select" aria-label="Default">
                                        <option selected>Default</option>
                                        <option value="1">Dynamic</option>
                                        <option value="2">Fixed</option>
                                    </select>                                
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Card default size</label>
                                    <select class="form-select" aria-label="Default">
                                        <option selected>Default</option>
                                        <option value="1">Small</option>
                                        <option value="2">Medium</option>
                                        <option value="3">Big</option>
                                    </select>                                
                                </div>

                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Number of card on page load</label>
                                    <select class="form-select" aria-label="Default">
                                        <option selected>Default</option>
                                        <option value="1">50</option>
                                        <option value="2">100</option>
                                        <option value="3">200</option>
                                    </select>                                
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Number of card to load by scroll</label>
                                    <select class="form-select" aria-label="Default">
                                        <option selected>Default</option>
                                        <option value="1">50</option>
                                        <option value="2">100</option>
                                        <option value="3">200</option>
                                    </select>                                
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="v-pills-font" role="tabpanel" aria-labelledby="v-pills-font-tab" tabindex="0">
                            <div class="container">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Default font</label>
                                    <select class="form-select" aria-label="Default">
                                        <option selected>Default</option>
                                        <option value="1">Helvetica</option>
                                        <option value="2">Times New Roman</option>
                                        <option value="3">Comic Sans</option>
                                    </select>                                
                                </div>

                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Card font size</label>
                                    <select class="form-select" aria-label="Default">
                                        <option selected>Default</option>
                                        <option value="1">Small</option>
                                        <option value="2">Medium</option>
                                        <option value="3">Big</option>
                                    </select>                                
                                </div>

                            </div>
                        </div>

                        <div class="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab" tabindex="0">
                            <div class="container">
                                <div class="mb-3 d-flex gap-2 align-items-center">
                                        <label for="exampleFormControlInput1" class="form-label">Header color</label>
                                        <div class="ms-auto"><x-form.color-picker ></x-form.color-picker></div>
                                </div>

                                <div class="mb-3 d-flex gap-2 align-items-center">
                                        <label for="exampleFormControlInput1" class="form-label">Sidebar color</label>
                                        <div class="ms-auto"><x-form.color-picker></x-form.color-picker></div>
                                        
                                </div>

                                <div class="mb-3 d-flex gap-2 align-items-center">
                                        <label for="exampleFormControlInput1" class="form-label">Background color</label>
                                        <div class="ms-auto"><x-form.color-picker></x-form.color-picker></div>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="v-pills-background" role="tabpanel" aria-labelledby="v-pills-background-tab" tabindex="0">
                            <div class="container">
                                <div class="mb-3 gap-2 align-items-center">
                                    <label for="exampleFormControlInput1" class="form-label">Background image</label>
                                    <div class="ms-auto"><input class="form-control" type="file"></div>
                                </div>

                                <div class="mb-3 d-flex flex-row gap-2 align-items-center justify-content-center">
                                    <label for="exampleFormControlInput1" class="form-label">Repeat background image</label>
                                    <div class="d-inline ms-auto"><input type="checkbox"></div>
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="v-pills-transparency" role="tabpanel" aria-labelledby="v-pills-transparency-tab" tabindex="0">
                            <div class="container">
                                <div class="mb-3 gap-2 align-items-center">
                                        <label for="exampleFormControlInput1" class="form-label">Header transparency</label>
                                        <input class="d-block w-100" type="range" name="">
                                </div>

                                <div class="mb-3 gap-2 align-items-center">
                                        <label for="exampleFormControlInput1" class="form-label">Card transparency</label>
                                        <input class="d-block w-100" type="range" name="">
                                </div>

                                <div class="mb-3 gap-2 align-items-center">
                                        <label for="exampleFormControlInput1" class="form-label">Sidebar transparency</label>
                                        <input class="d-block w-100" type="range" name="">
                                </div>

                                <div class="mb-3 gap-2 align-items-center">
                                        <label for="exampleFormControlInput1" class="form-label">Card editor black transparency</label>
                                        <input class="d-block w-100" type="range" name="">
                                </div>
                            </div>
                        </div>

                        <div class="tab-pane fade" id="v-pills-about" role="tabpanel" aria-labelledby="v-pills-about-tab" tabindex="0">
  
                            ...

                        </div>
                    </div>
                </div>
            </div>

            <div class="modal-footer">
                <button type="submit" class="btn btn-light btn-outline-secondary border border-0 ms-auto" id="saveBtn">Save</button>
                <button id="removeBtn" class="btn btn-light btn-outline-secondary border border-0 ">Cancel</button> 
                <button id="removeBtn" class="btn btn-light btn-outline-secondary border border-0 ">Apply</button> 
            </div>
        </div>
    </div>
</div>