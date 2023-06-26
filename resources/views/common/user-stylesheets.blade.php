    body {  
        background-color: rgb({{ setting('bg-color') }});
    }

    #header {
        background: rgb({{ setting('head-color') }});
    }
    
    #sidebar {
        background: rgb({{ setting('side-color') }});
    }

    .note {
        width: var(--{{ setting('card-size') }}-width);
        min-height: var(--{{ setting('card-size') }}-height);
    }

    .note-tag {
        height: 20px;
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

        .note {
            height: var(--{{ setting('card-size') }}-height);
        }

        .note-body {
            overflow-y: hidden;
        }

    @endif

    .note {
        font-size: {{ setting('card-font-size') }};
    }