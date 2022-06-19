import React, {useState} from 'react';
import CallApi from './CallApi';

export default function Page() {
    const [content, setContent] = useState("");

    function getContent() {
        CallApi.getSomething()
        .then(response => {
            console.log(response.data)
            setContent(response.data)
        })
    }
    
    getContent();
    console.log(content)

    return (
            <>
                <h1>{ content }</h1>
            </>
    );
}