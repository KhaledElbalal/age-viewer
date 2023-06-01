import PropTypes from 'prop-types';
import { Button } from 'antd';
import React from 'react';
import uuid from 'react-uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import KeyWordFinder from '../../features/query_builder/KeyWordFinder';

const BuilderSelection = ({ finder, setQuery, currentWord }) => {
  const handleClick = (e) => {
    const selectedVal = e.target.getAttribute('data-val');
    setQuery(selectedVal);
  };
  return (
    <ul className="option-list">
      {
    finder?.getConnectedNames(currentWord).map(
      (element) => (
        <li className="list-item" key={uuid()}>
          <Button
            className="btn btn-option"
            onClick={handleClick}
            data-val={element}
            icon={<FontAwesomeIcon icon={faPlus} />}
          >
            {element}
          </Button>
        </li>
      ),
    )
    }
    </ul>
  );
};

BuilderSelection.propTypes = {
  finder: PropTypes.shape(KeyWordFinder).isRequired,
  setQuery: PropTypes.func.isRequired,
  currentWord: PropTypes.string.isRequired,
};
export default BuilderSelection;
