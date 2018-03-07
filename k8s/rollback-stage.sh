#!/bin/bash

if [ ${TEST_PASSED} == "true" ]
then
    echo Test passed. This step skipped.
    exit 0
fi

COMPONENT=$(grep -m1 name package.json | tr -d '\r' | awk -F: '{ print $2 }' | sed 's/[", ]//g')

ansible-playbook k8s/rollback-stage.yml -u ubuntu -e COMPONENT=${COMPONENT} --private-key=~/.ssh/iqsadmin.pem -vvvv