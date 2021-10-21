import React from 'react';
import './TodoListing.css';

const TodoListing = props => {
  const { items, onDelete, onEdit } = props;

  return (
    <ul>
      {items.map(item => {
        return (
          <li key={item.id}>
            <div className="item-wrapper">
              <span className="title">{item.title}</span>
              <span className="actions">
                <i className="fa fa-edit" onClick={() => onEdit(item)} />
                <i className="fa fa-remove" onClick={() => onDelete(item)} />
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoListing;
