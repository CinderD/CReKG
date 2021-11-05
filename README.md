# Legal-Knowledge-Graph
This is the repository for the Final Year Project -- Knowledge Graph Construction on legal documents. 

Current Progress:
  1. Built up a naive KG with stanza. The code is in folder 'trials for NER'.

Current Problem: 
  1. Focus of our data. The dataset we obtained from the US Supreme Court are cases, rather than Contracts. In the pre-processed data, each case is separated into several parts, e.g., description, opion of the court, ...
  2. Lack of annotated  dataset for NER in legal domain. Thus is't hard to fine-tune the legal-bert to do sequence labelling.
  3. The first trial with stanza only involves case0 in folder 16(contract related cases). The pre-processed data are not that clean since several sentances do not even make sense. The whole corpus in case0 is feeded to the model without any processing. Seems like the resulting KG does not make much sense.

Current Plan:
  1. Further go through legal NER related papers(e.g., Neural Contract Element Extraction Revisited) to find useful annotated dataset to be used in Legal-Bert(also the available of this Legal Bert should be varified.)
  2. Evaluating the difficulty of working on contracts and working on the cases related to contracts. Recent preference is on cases related to contracts since the corpus is already gained.
