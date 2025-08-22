import Auth from "server/lib/auth";

export type Session = ReturnType<typeof Auth>['$Infer']['Session']['session'];
export type User = ReturnType<typeof Auth>['$Infer']['Session']['user'];