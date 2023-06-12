    body {  
        background-color: rgb({{ setting('bg-color') }});
    }

    #header {
        background: rgb({{ setting('head-color') }});
    }
    
    #sidebar {
        background: rgb({{ setting('side-color') }});
    }

    .card {
        width: var(--{{ setting('card-size') }}-width);
        min-height: var(--{{ setting('card-size') }}-height);
    }

    .colored-btn {
        color: white;
        background-color: rgb({{ setting('head-color') }});
    }

    .colored-btn:hover {
        color: white;
        background-color: rgb({{ setting('head-color') }});
    }


@if (setting('card-size-style') == "fixed")
    .card-text {
        height: var(--{{ setting('card-size') }}-height);
        overflow-y: hidden;
    }
@endif

    .card {
        font-size: {{ setting('card-font-size') }};
    }