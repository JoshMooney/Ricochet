#include "StringMap.h"
#include <iostream>
#include <map>

using namespace std;

typedef list<pair<string, int>>::const_iterator listIterator;

// Sample usage of StringMap class.

int main() {
	map<string,int> stlMap;
	//insert a tupple
	//1 way
	stlMap["jack"] = 1;
	stlMap["jackie"]++;//same but more confusing
	//2 way
	pair<map<string, int >::iterator, bool> result = stlMap.insert(make_pair("jill",1));


	StringMap<pair<string, int>, listIterator> map;

	bool result = map.insert(make_pair("jack", 1));	// result is true (could insert)
	result = map.insert(make_pair("jill", 1));		// result is true
	result = map.insert(make_pair("jack", 3));		// result is false (cannot insert)
	pair<bool, listIterator> r = map.get("jill");
	result = map.remove(make_pair("jill", 1));
	/*if ( result == true)
		cout << true;*/
	system("PAUSE");

}
