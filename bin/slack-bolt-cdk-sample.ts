#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { SlackBoltCdkSampleStack } from '../lib/slack-bolt-cdk-sample-stack';

const app = new cdk.App();
new SlackBoltCdkSampleStack(app, 'SlackBoltCdkSampleStack');
