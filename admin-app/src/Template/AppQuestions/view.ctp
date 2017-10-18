<div class="actions columns large-2 medium-3">
    <h3><?= __('Actions') ?></h3>
    <ul class="side-nav">
        <li><?= $this->Html->link(__('Edit App Question'), ['action' => 'edit', $appQuestion->id]) ?> </li>
        <li><?= $this->Form->postLink(__('Delete App Question'), ['action' => 'delete', $appQuestion->id], ['confirm' => __('Are you sure you want to delete # {0}?', $appQuestion->id)]) ?> </li>
        <li><?= $this->Html->link(__('List App Questions'), ['action' => 'index']) ?> </li>
        <li><?= $this->Html->link(__('New App Question'), ['action' => 'add']) ?> </li>
    </ul>
</div>
<div class="appQuestions view large-10 medium-9 columns">
    <h2><?= h($appQuestion->id) ?></h2>
    <div class="row">
        <div class="large-5 columns strings">
            <h6 class="subheader"><?= __('Question') ?></h6>
            <p><?= h($appQuestion->question) ?></p>
            <h6 class="subheader"><?= __('Answer') ?></h6>
            <p><?= h($appQuestion->answer) ?></p>
        </div>
        <div class="large-2 columns numbers end">
            <h6 class="subheader"><?= __('Id') ?></h6>
            <p><?= $this->Number->format($appQuestion->id) ?></p>
            <h6 class="subheader"><?= __('App School Id') ?></h6>
            <p><?= $this->Number->format($appQuestion->app_school_id) ?></p>
        </div>
    </div>
</div>
