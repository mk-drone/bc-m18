import React from 'react';

import styles from './MessageList.css';

const Message = props => (
    <div className={styles.Message}>
        <strong>{props.from} :</strong>
        <span>{props.text}</span> 
    </div>
);

const MessageList = props => (
    <div className={styles.MessageLisat}>
        {
            props.messages.map((msg,i)=>{
                if(msg) {
                    return ( 
                        <Message key={i}
                            from={msg.from}
                            text={msg.text}
                        />
                    );
                }
            })
        }
    </div>
);

export default MessageList;