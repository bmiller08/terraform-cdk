import { Construct } from "constructs";
import { App, TerraformStack, Testing } from "cdktf";
import { OurLocalModule } from "./.gen/modules/our-local-module";
import { Gcloud } from "./.gen/modules/gcloud";
import { IamAccount } from "./.gen/modules/terraform-aws-modules/aws/iam/modules/iam-account";

export class HelloTerra extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new OurLocalModule(this, "local-module", {});
    new Gcloud(this, "gcloud", {});
    new IamAccount(this, "iam", {
      accountAlias: "cdktf",
    });
  }
}

const app = Testing.stubVersion(new App({ stackTraces: false }));
new HelloTerra(app, "hello-modules");
app.synth();
