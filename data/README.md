This is the data folder for CReKG.

Contract_Example.txt is an example contract for the contract review function.

To run the project, you need to download Neo4j database on your computer.
To create a new database for this project, press "Add" button under "Project" section.

Choose "Local DBSM"
Name of DB: LKG2
Passcode: LKG

Then check if the Bolt Port number is 7687. If not, you need to change all serverUrl (frontend/src/components/SearchHelper/Search.js and frontend/src/components/VisualHelper/DrawKG.js)

Then you need to add "Graph Data Science Library" in your DB plugins


The next step is to load data in your DB.

First, put all csv files under "csvdata" folder into the "import" folder in your neo4j DB.
To find the path of your "import" folder, you can simpley run a query "load csv from A" and the error message will tell you the path of your import folder.

After the above step, you need to run some queries to load the csv files, build up the KG and run some graph algorithms.

Run the following queries one by one:

LOAD CSV WITH HEADERS FROM 'file:///GPE.csv' AS row
MERGE (s:GPE {name:row.GPE})
RETURN count(s);

LOAD CSV WITH HEADERS FROM 'file:///Business_Related_Terms.csv' AS row
MERGE (s:Business_Related_Terms {name:row.Business_Related_Terms})
RETURN count(s);

LOAD CSV WITH HEADERS FROM 'file:///Contract_Categories.csv' AS row
MERGE (s:Contract_Categories {name:row.Contract_Categories})
RETURN count(s);

LOAD CSV WITH HEADERS FROM 'file:///General.csv' AS row
MERGE (s:General {name:row.General})
RETURN count(s);

LOAD CSV WITH HEADERS FROM 'file:///Legal_Related_Practitioner.csv' AS row
MERGE (s:Legal_Related_Practitioner {name:row.Legal_Related_Practitioner})
RETURN count(s);

LOAD CSV WITH HEADERS FROM 'file:///Legal_Related_Terms.csv' AS row
MERGE (s:Legal_Related_Terms {name:row.Legal_Related_Terms})
RETURN count(s);

LOAD CSV WITH HEADERS FROM 'file:///ORG.csv' AS row
MERGE (s:ORG {name:row.ORG})
RETURN count(s);

LOAD CSV WITH HEADERS FROM 'file:///PERSON.csv' AS row
MERGE (s:PERSON {name:row.PERSON})
RETURN count(s);

LOAD CSV WITH HEADERS FROM 'file:///Product.csv' AS row
MERGE (s:Product {name:row.Product})
RETURN count(s);

LOAD CSV WITH HEADERS FROM 'file:///State_or_Country.csv' AS row
MERGE (s:State_or_Country {name:row.State_or_Country})
RETURN count(s);

LOAD CSV WITH HEADERS FROM "file:///latest_full_kg.csv" as input
MATCH (n),(m)
where n.name = input.source AND m.name = input.target
CREATE (n)-[r:Relation{name:input.edge}]->(m)
return count(r)

CALL gds.graph.create(
  'LKG',    
  ['GPE','PERSON','State_or_Country','Product','ORG','Legal_Related_Terms','Legal_Related_Practitioner','General','Contract_Categories','Business_Related_Terms'],   
  ['Relation']     
)
YIELD
  graphName AS graph, nodeProjection, nodeCount AS nodes, relationshipCount AS rels

CALL gds.pageRank.write('LKG', {
  maxIterations: 20,
  dampingFactor: 0.85,
  writeProperty: 'pagerank'
})
YIELD nodePropertiesWritten, ranIterations



After running all above queries successfully, your DB is prepared.