import { useState, useEffect } from 'react';
import { ListItem } from '../components';
import SearchList from '../components/SearchList';
import { useParams } from 'react-router-dom';
import { updateItem } from '../api/firebase';
import { isMoreThanADayAgo } from '../utils';

export function List({ data, listPath }) {
	const [newList, setNewList] = useState([]);
	const { path } = useParams();

	useEffect(() => {
		setNewList(data);
	}, [data]);

	const wasRecentlyPurchased = (item) => {
		if (!item.dateLastPurchased) {
			return false;
		}
		return !isMoreThanADayAgo(item.dateLastPurchased);
	};

	const updatePurchaseDate = (listPath, item, date) => {
		updateItem(listPath, item, date);
	};

	return (
		<>
			<h2>
				You are on the <code>{path}</code> list!
			</h2>
			<SearchList data={data} setNewList={setNewList} />
			<ul>
				{newList.map((item) => (
					<ListItem
						dateLastPurchased={item.dateLastPurchased}
						isRecentlyPurchased={wasRecentlyPurchased(item)}
						itemId={item.id}
						key={item.id}
						listPath={listPath}
						name={item.name}
						purchaseDate={item.dateLastPurchased}
						updatePurchaseDate={updatePurchaseDate}
					/>
				))}
			</ul>
		</>
	);
}
