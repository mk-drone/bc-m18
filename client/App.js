import React, { Component } from 'react';
import io from 'socket.io-client';

import styles from './App.css';

import MessageForm from './MessageForm';
import MessageList from './MessageList';
import UsersList from './UsersList';
import UserForm from './UserForm';

const socket = io('/');

class App extends Component {
    constructor(props){
        super(props);
        this.state = { 
            users: [], 
            messages: [], 
            text: '', 
            name: ''
        };
    }

    componentDidMount() {
        socket.on('message', message => this.messageReceived(message));
        socket.on('update', ({users}) => this.chatUpdate(users));
    }

    messageReceived(msg) {
        const messages = [msg, ...this.state.messages];
        this.setState({messages});
    }

    chatUpdate(users) {
        this.setState({users});
    }

    handleMsgSubmit(msg) {
        this.messageReceived(msg);
        socket.emit('message', msg);
    }

    handleUserSubmit(name) {
        this.setState({name});
        socket.emit('join', name);
    }
    
    renderLayout() {
        return (
            <div className={styles.App}>
                <div className={styles.AppHeader}>
                    <div className={styles.AppTotle}>
                        ChatApp
                    </div>
                    <div className={styles.AppRoom}>
                        AppRoom
                    </div>
                </div>
                <div className={styles.AppBody}>
                    <UsersList users={this.state.users} />
                    <div className={styles.MessageWrapper}>
                        <MessageList messages={this.state.messages} />
                        <MessageForm onSubmit={msg => this.handleMsgSubmit(msg)} name ={this.state.name} />
                    </div>
                </div>
            </div>
        );
    }

    renderUserForm(){
        return (<UserForm onUserSubmit={name=>this.handleUserSubmit(name)} />);
    }

    render() {
        return this.state.name !== '' ? this.renderLayout() : this.renderUserForm();
    }

};


export default App;