This intended to be a known functional pattern to follow for MS Power Apps.  Power Apps may have timing issues which cause difficulty obtaining metadata values.  This is tested with a Canvas app implementation but may work for Model apps as well. 

This is NOT a one-size fits all, grab-the-whole-folder-and-run implementation, and the files besides index.ts may not be correct for your implementation.  

Following the pattern outlined in index.ts should result in having visitors populated with visitor and account metadata on initialization when used in a PowerApps Component Framework (PCF) solution.  

NOTE: In index.ts, there's optional validation logic which requires metadata values to be populated in order to initialize Pendo (noted in the comments as well).  This ensures that we always have metadata when the snippet is initialized, but if there's a chance that'll you have empty values, this validation would prevent initialization.  This pattern is based on a known-working customer install, but consider whether it's needed for your use case.