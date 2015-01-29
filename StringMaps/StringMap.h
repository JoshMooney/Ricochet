#ifndef STRINGMAP_H
#define STRINGMAP_H

#include <string>
#include <list>
#include <vector>
#include <utility>	// for std::pair

using std::string;
using std::list;
using std::vector;
using std::pair;

template <typename T, typename Iterator>
class StringMap {
private:
	vector<list<T>> m_linkedTable;

	unsigned int stringHash(string const & str) const;

public:
	StringMap();

	bool insert( T const & value );
	bool remove( T const & value );
	std::pair<bool, Iterator> const get( string const & key ) const;

};
#endif 

template <typename T, typename Iterator>
StringMap<T, Iterator>::StringMap<T, Iterator>() {
	m_linkedTable.resize(10);
}

template <typename T, typename Iterator>
bool StringMap<T, Iterator>::insert( T const & value ) {
	unsigned int hash = stringHash(value.first);
	pair<bool,Iterator> result = get(value.first);
	if (! result.first) {
		m_linkedTable.at(hash % 10).push_back(value);
		return true;
	}
	else {
		return false;
	}
}


template <typename T, typename Iterator>
bool StringMap<T, Iterator>::remove( T const & value ) {
	unsigned int hash = stringHash(value.first);
	pair<bool,Iterator> result = get(value.first);
	if (result.first) {
		m_linkedTable.at(hash % 10).erase(result.second);
		return true;
	}
	else {
		return false;
	}
}



template <typename T, typename Iterator>
pair<bool, Iterator> const StringMap<T, Iterator>::get( string const & key ) const {
	unsigned int hash = stringHash(key);
	Iterator it = m_linkedTable.at( hash % 10 ).begin();
	Iterator itEnd = m_linkedTable.at( hash % 10 ).end();
	for ( ; it != itEnd && (*it).first != key ; it++ );
	if ( it != itEnd ) { // if key found
		return make_pair( true, it );
	}
	else {
		return make_pair( false, itEnd );
	}
}

template <typename T, typename Iterator>
unsigned int StringMap<T, Iterator>::stringHash(string const & str) const {
	unsigned int hash = 0;    
    int length = str.length();
    for (int i = 0; i < length; i++) {
        hash += ( (i + 1) * str[i] );
    }    
    return hash;
}