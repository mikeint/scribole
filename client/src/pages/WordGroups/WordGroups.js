import React, { useEffect, useState } from 'react';
import './WordGroups.scss';
import NavBar from '../../components/NavBar/NavBar';
import TopBar from '../../components/TopBar/TopBar';
import wordGroupsJson from './wordGroups.json';

const WordGroups = () => {
    const [selectedItems, setSelectedItems] = useState(() => {
        return JSON.parse(localStorage.getItem('selectedItems')) || [];
    });
    const [selectedGroups, setSelectedGroups] = useState(() => {
        return JSON.parse(localStorage.getItem('selectedGroups')) || [];
    });

    useEffect(() => {
        localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
        localStorage.setItem('selectedGroups', JSON.stringify(selectedGroups));
    }, [selectedItems, selectedGroups]);

    const toggleItemSelection = (item) => {
        setSelectedItems((prevSelectedItems) => {
            const itemExists = prevSelectedItems.some(
                (selectedItem) => selectedItem.italian === item.italian
            );
            if (itemExists) {
                return prevSelectedItems.filter(
                    (selectedItem) => selectedItem.italian !== item.italian
                );
            } else {
                return [...prevSelectedItems, item];
            }
        });
    };

    const toggleGroupSelection = (group) => {
        setSelectedGroups((prevSelectedGroups) => {
            if (prevSelectedGroups.includes(group)) {
                return prevSelectedGroups.filter(
                    (selectedGroup) => selectedGroup !== group
                );
            } else {
                return [...prevSelectedGroups, group];
            }
        });

        setSelectedItems((prevSelectedItems) => {
            const groupItems = wordGroupsJson
                .find((groupData) => groupData[group])
                [group].map((itemData) => ({
                    italian: itemData.italian,
                    english: itemData.english,
                    category: group,
                }));

            if (selectedGroups.includes(group)) {
                return prevSelectedItems.filter(
                    (item) => !groupItems.some((groupItem) => groupItem.italian === item.italian)
                );
            } else {
                return [...prevSelectedItems, ...groupItems];
            }
        });
    };

    console.log(selectedGroups, selectedItems);

    const displayWordGroups = () => {
        return wordGroupsJson.map((groupData, i) => {
            const groupName = Object.keys(groupData)[0];
            const items = groupData[groupName];

            return (
                <div key={i} className="accordionContainer">
                    <label htmlFor={'item-' + i} className="toggle">
                        <input
                            type="checkbox"
                            checked={selectedGroups.includes(groupName)}
                            onChange={() => toggleGroupSelection(groupName)}
                        />
                        {groupName}
                    </label>
                    <input type="checkbox" name="one" id={'item-' + i} className="hide-input checkBox" />
                    <div className="toggle-el">
                        {items.map((item, j) => (
                            <div key={j} className="wordGroup">
                                <label>
                                    <input
                                        className="checkBox"
                                        type="checkbox"
                                        checked={selectedItems.some(
                                            (selectedItem) => selectedItem.italian === item.italian
                                        )}
                                        onChange={() => toggleItemSelection(item)}
                                    />
                                    {item.italian} - {item.english}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            );
        });
    };

    return (
        <>
            <TopBar />
            <NavBar />
            <div className="WordGroupsContainer">{displayWordGroups()}</div>
        </>
    );
};

export default WordGroups;
