const React = require('react');

const HelloMessage = ({name}) => {
    return(
        <div>
            <h1>Hello {name}</h1>
            <p>Welcome to the about page!</p>
        </div>
    )
}

module.exports = HelloMessage